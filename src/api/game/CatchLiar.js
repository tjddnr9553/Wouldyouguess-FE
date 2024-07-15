import axios from 'axios';
export const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

export const catchLiar_start = async (roomId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/catchLiar/start`,
            data: {
                roomId
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const catchLiar_info = async (gameId, userId, round) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/catchLiar/info`,
            params: {
                catchLiarGameId: gameId,
                userId,
                round
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};


export const catchLiar_vote_candidates = async (gameId) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/catchLiar/candidates`,
            params: {
                catchLiarGameId: gameId
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const catchLiar_vote = async (gameId, votingUserId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/catchLiar/vote`,
            data: {
                catchLiarGameId: gameId,
                votingUserId
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const catchLiar_result = async (gameId, userId) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/catchLiar/result`,
            data: {
                catchLiarGameId: gameId,
                userId
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const catchLiar_image_upload = async (formData) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/catchLiar/image`,
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            data: formData
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const catchLiar_image_delete = async (gameId, key, path) => {
    try {
        const res = await axios({
            method: "DELETE",
            url: `${API_SERVER_URL}/api/catchLiar/image`,
            data: {
                catchLiarGameId: gameId,
                key,
                path
            }
        });

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
};



