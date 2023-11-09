import { Borrowers } from "../models/borrowers.js";

const borrowers = new Borrowers();

const showAll = async (req, res) => {
  try {
    const allBorrowers = await borrowers.index().catch((err) => {
      res.status(401);
      throw Error(`Can't read registered borrowers from database:${err}`);
    });

    res.json(allBorrowers);
  } catch (err) {
    res.json(err);
  }
};

const registerBorrower = async (req, res) => {
  const newBorrower = { ...req.body.borrower };

  try {
    const result = await borrowers.register(newBorrower).catch((err) => {
      res.status(403);
      throw new Error(err);
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const editBorrowerInfo = async (req, res) => {
  const updatedInfo = { ...req.body.updatedInfo };
  const borrowerEmail = req.params.email;
  try {
    const result = await borrowers
      .update(updatedInfo, borrowerEmail)
      .catch((err) => {
        res.status(404);
        throw err;
      });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
const endMembership = async (req, res) => {
  const borrowerEmail = req.params.email;
  try {
    const result = await borrowers.delete(borrowerEmail).catch((err) => {
      res.status(405);
      throw err;
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

const borrowersHandler = (app) => {
  app.get("/borrowers", showAll);
  app.post("/borrowers", registerBorrower);
  app.post("/borrowers/:email", editBorrowerInfo);
  app.delete("/borrowers/:email", endMembership);
};

export default borrowersHandler;
