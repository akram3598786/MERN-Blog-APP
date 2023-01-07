
export default function formateDate(createdAt, updatedAt){
    let Credate = createdAt.split("T")[0].split(".")[0];
    let CreTime = createdAt.split("T")[1].split(".")[0];
    let Update = updatedAt.split("T")[0].split(".")[0];
    let UpdTime = updatedAt.split("T")[1].split(".")[0];

    const formated = {
        Credate: Credate,
        CreTime: CreTime,
        Update: Update,
        UpdTime: UpdTime
    }
    return formated;
}