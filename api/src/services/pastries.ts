import Pastries from "src/models/pastriesModel.ts";

export const findInStockPastries = async () => {
  try {
    return await Pastries.find({ stock: { $gt: 0 } });
  } catch (error: any) {
    console.error("Error finding pastries in stock: ", error);
  }
};

export const saveWonPastries = async (pastriesId: string) => {
  console.log(
    `Pastries ${pastriesId} won!, decrementing stock and incrementing quantityWon`
  );
  try {
    return await Pastries.updateOne(
      { _id: pastriesId },
      { $inc: { quantityWon: 1, stock: -1 } }
    );
  } catch (error: any) {
    console.error("Error saving won pastries: ", error);
  }
};
