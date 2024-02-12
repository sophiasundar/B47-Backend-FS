import { client } from "../index.js"


export async function putPhones(id, updatePhones) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .updateOne({ _id: id }, { $set: updatePhones });
}

export async function addPhones(newPhone) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .insertOne(newPhone);
}

export async function deletePhones(id) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .deleteOne({ _id: id });
}

export async function getPhoneId(id) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .findOne({ _id: id });
}

export async function getPhones() {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .find()
        .toArray();
}
