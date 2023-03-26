import 'dotenv/config';
import axios from 'axios';
import {login} from './login.js';
import {v4 as uuidv4} from 'uuid';
import {getUserProfiles} from './profiles.js';
import {delayFn, getRandomElement} from './common.js'

let pk = process.env.PK;
let cont_list = ["That's awesome!", "Love it!", "You rock!", "Congrats!", "So happy for you!", "Keep it up!", "This is fantastic news!", "You deserve it!", "Amazing!", "Way to go!", "This is epic!", "You're killing it!", "You're a superstar!", "So proud of you!", "This is inspiring!", "You're on fire!", "Bravo!", "You're a champion!", "This is impressive!", "You're crushing it!", "You're unstoppable!", "So well deserved!", "You're making things happen!", "This is huge!", "You're the best!", "You're a genius!", "You're an inspiration!", "This is phenomenal!", "You're a boss!", "You're amazing!", "This is fantastic!", "You're a legend!", "This is a game-changer!", "You're a rockstar!", "You're incredible!", "You're an all-star!", "This is remarkable!", "You're a wizard!", "You're a powerhouse!", "This is brilliant!", "You're the man!", "You're the woman!", "This is exciting!", "You're a hero!", "You're a queen!", "You're a king!", "This is wonderful!", "You're a master!", "This is inspiring!", "GM bro"];
let publicationId = process.env.PUBLICATIONID;
const pub_list = publicationId.split(",");


let post1 = async (userProfile, context) => {
    let url = "https://metadata.lenster.xyz/";
    let config = {
        headers: {
            "referer": "https://claim.lens.xyz/",
            "origin": "https://claim.lens.xyz",
            "content-type": "application/json",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        }
    };
    let payload = {
        "version": "2.0.0",
        "metadata_id": `${uuidv4()}`,
        "description": `${context}`,
        "content": `${context}`,
        "external_url": `https://lenster.xyz/u/${userProfile.handle}`,
        "image": null,
        "imageMimeType": null,
        "name": `Comment by @${userProfile.handle}`,
        "tags": [],
        "animation_url": null,
        "mainContentFocus": "TEXT_ONLY",
        "contentWarning": null,
        "attributes": [{
            "traitType": "type",
            "displayType": "string",
            "value": "text_only"
        }],
        "media": [],
        "locale": "en",
        "appId": "Lenster"
    };
    try {
        let res = await axios.post(url, payload, config);
        // console.log("上传内容成功", res.data.id);
        return res.data.id;
    } catch (err) {
        console.log(`${userProfile.handle}---post1失败: ${err}`);
        return false
    }
    ;
}

let post2 = async (arId, pubId, userProfile, loginResult) => {
    let url = "https://api.lens.dev/";
    let config = {
        headers: {
            "referer": "https://lenster.xyz",
            "origin": "https://lenster.xyz",
            "content-type": "application/json",
            "x-access-token": `Bearer ${loginResult.accessToken}`,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        }
    };
    let payload = {
        "operationName": "CreateCommentViaDispatcher",
        "variables": {
            "request": {
                "profileId": `${userProfile.id}`,
                "contentURI": `ar://${arId}`,
                "publicationId": pubId,
                "collectModule": {"revertCollectModule": true},
                "referenceModule": {"followerOnlyReferenceModule": false}
            }
        },
        "query": "mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {\n  createCommentViaDispatcher(request: $request) {\n    ...RelayerResultFields\n    __typename\n  }\n}\n\nfragment RelayerResultFields on RelayResult {\n  ... on RelayerResult {\n    txHash\n    txId\n    __typename\n  }\n  ... on RelayError {\n    reason\n    __typename\n  }\n  __typename\n}"
    };
    // console.log("post 2 payload", payload);
    try {
        let res = await axios.post(url, payload, config);
        // console.log("post2 reply", res.data);
        if (res.data.data.createCommentViaDispatcher.txId != "") {
            console.log(`${userProfile.handle}---评论成功`);
        }
    } catch (err) {
        console.log(`${userProfile.handle}---评论失败: ${err}`);
        return false
    }
    ;
}


async function start(pk, delay) {
    try {
        console.log("pk",pk);
        let loginResult = await login(pk);
        await delayFn(delay); // 延迟执行
        let userProfile = await getUserProfiles(pk);
        await delayFn(delay); // 延迟执行
        for (let i = 0; i < pub_list.length; i++) {
            let context1 = getRandomElement(cont_list);
            console.log("评论内容：", context1);
            let arId = await post1(userProfile, context1);
            await delayFn(delay); // 延迟执行
            await post2(arId, pub_list[i],userProfile,loginResult);
            await delayFn(delay); // 延迟执行
        }

    } catch (error) {
        console.error(`task failed: ${error}`);
    }
}

const pk_list = pk.split(",");
for (let i = 0; i < pk_list.length; i++) {
    const delay = Math.floor(Math.random() * 1 + 1) * 1000; // 生成1-10的随机数
    start(pk_list[i], delay)
        .then(() => console.log(`${new Date().toISOString()} task ${i + 1} completed`))
        .catch(error => console.error(`${new Date().toISOString()} task ${i + 1} failed: ${error}`));
}