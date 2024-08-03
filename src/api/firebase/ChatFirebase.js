import { onValue, ref, set } from "firebase/database"
import { firebaseDatabase } from "../../config/firebase";

export const getChatFirebase = ({ param, callback }) => {
    onValue(ref(firebaseDatabase, `chat/${param.to_id}-${param.from_id}`), (snapshot) => {
        callback && callback();
    });
}

export const createChatFirebase = ({ body }) => {
    set(ref(firebaseDatabase, `chat/${body.from_id}-${body.to_id}`), body).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}