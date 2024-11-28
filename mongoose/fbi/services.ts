import FBIModel  from "./model";
import { FbiInterface } from "./interface";

export async function storeDocument(doc: FbiInterface): Promise<boolean> {
    try {
        await FBIModel.create(doc);
    } catch (error) {
        return false;
    }
    return true;
}

export async function findByTitle(
    paramTitle: string
): Promise<Array<FbiInterface> | null> {
    try {
        return await FBIModel.findOne({title: paramTitle});
    } catch (err) {
        console.log(err);
    }
    return [];
}

export async function updateByTitle(
    paramTitle: string,
    newData: FbiInterface
): Promise<boolean> {
    try {
        await FBIModel.updateOne({zip: paramTitle}, newData);
        return true;
    } catch (err) {
        console.log(err);
    }
    return false;
}

export async function deleteByTitle(
    paramTitle: string
): Promise<boolean> {
try {
    await FBIModel.deleteOne({zip: paramTitle});
    return true;
} catch (err) {
    console.log(err);
}
return false;
}
