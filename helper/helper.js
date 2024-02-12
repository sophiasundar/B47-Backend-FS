import { client } from "../index.js"
import { ObjectId } from "mongodb"; 

export async function putPhones(id, updatePhones) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .updateOne({ _id: new ObjectId(id)  }, { $set: updatePhones });
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
        .deleteOne({ _id: new ObjectId(id)  });
}

export async function getPhoneId(id) {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .findOne({_id: new ObjectId(id) });
}

export async function getPhones() {
    return await client
        .db("phone-catalog")
        .collection("phones")
        .find()
        .toArray();
}

// export async function deletePhoneId(_id, res) {
//     return client
//         .db("phone-catalog")
//         .collection("phones")
//         .deleteOne({ _id }, (err, result) => {
//             if (err) throw err;
//             res.send("Deleted Successfully");
//         });