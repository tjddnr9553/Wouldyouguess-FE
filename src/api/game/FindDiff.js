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
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 합니다.
  }
};

export const findDiff_original_images = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/original/image/${findDiffGameId}`,
            params: {
                userId
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

export const findDiff_generated_images = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/generated/image/${findDiffGameId}`,
            params: {
                userId
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

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

