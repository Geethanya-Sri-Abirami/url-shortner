import Url from "../models/Url.js";
import { nanoid } from "nanoid";

// CREATE SHORT URL
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortId = nanoid(8);

    const newUrl = await Url.create({
      originalUrl,
      shortId,
      userId: req.userId,
    });

    res.json({
      message: "Shortened successfully",
      shortUrl: `${process.env.CLIENT_URL}/${shortId}`,
      data: newUrl,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ error: "Failed to create URL" });
  }
};

// GET ALL URLS FOR USER
export const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(urls);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

// DELETE URL
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({ _id: id, userId: req.userId });
    if (!url) return res.status(404).json({ message: "URL not found" });

    await Url.deleteOne({ _id: id });
    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: "Failed to delete URL" });
  }
};

// REDIRECT
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const urlDoc = await Url.findOne({ shortId });
    if (!urlDoc) return res.status(404).json({ message: "URL not found" });

    urlDoc.clicks += 1;
    await urlDoc.save();

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error("REDIRECT ERROR:", error);
    res.status(500).json({ error: "Error redirecting" });
  }
};
