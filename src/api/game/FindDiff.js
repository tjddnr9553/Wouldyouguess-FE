import axios from 'axios';
export const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;


export const findDiff_start = async (roomId) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/findDiff/start`,
            data: {
                roomId,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

export const findDiff_upload = async (upload_form) => {
  try {
    const response = await axios.post(
      `${API_SERVER_URL}/api/findDiff/upload`,
        upload_form
    );

    return response;
  } catch (error) {
    console.error("이미지 처리 중 오류 발생:", error);
  }
};

export const findDiff_game_images = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/images/${findDiffGameId}`,
            params: {
                userId
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
};

export const findDiff_result = async (findDiffGameId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/result/${findDiffGameId}`,
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

export const findDiff_update_score = async (userId, gameId, chance, isFound) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/findDiff/score`,
            data: {
                userId,
                gameId,
                chance,
                isFound
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}