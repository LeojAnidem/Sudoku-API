import { getSudoku } from "../services/sudokuServices.js";
import { Difficult } from "../types/sudokuTypes.js";
export const get = (_req, res, next) => {
    res.send(getSudoku(Difficult.Easy));
};
export const getByDifficult = (req, res, next) => {
    try {
        const { difficult } = req.params;
        const parseDifficult = Object.values(Difficult).find((x) => x === difficult);
        if (!parseDifficult)
            throw new Error(`The selected '(${difficult})' difficulty is not valid`);
        res.send(getSudoku(parseDifficult));
    }
    catch (e) {
        const { name, message } = e;
        res.send({ [name]: message });
    }
};
