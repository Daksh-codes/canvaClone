import Assets from "../model/assetsModel.js";

export const getAssets = async (req, res) => {
  try {
    const assets = await Assets.find();
    return res.status(200).json(assets);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createAssets = async (req, res) => {
  try {
    const asset = new Assets(req.body);
    const savedAsset = await asset.save();
    return res
      .status(201)
      .json({ message: "Asset created succesfully ", data: savedAsset });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteAssets = async (req, res) => {
  try {
    const assetId = req.params.assetId;
    const deletedAsset = await Assets.findByIdAndDelete(assetId);
    return res
      .status("200")
      .json({ message: "Asset deleted succesfully ", data: deletedAsset });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
