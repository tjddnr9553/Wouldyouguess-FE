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

export const findDiff_upload = async (uploadForm) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/findDiff/upload`,
            data: {
                uploadForm,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("이미지 처리 중 오류 발생:", error);
    }
}

export const findDiff_og = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/og/${findDiffGameId}/${userId}`
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

export const findDiff_inpaint = async (inpaintForm) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${API_SERVER_URL}/api/findDiff/inpaint`,
            data: {
                inpaintForm
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("백그라운드 작업 중 오류 발생:", error);
    }
}

export const findDiff_gen = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/gen/${findDiffGameId}/${userId}`
        });

        return response;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}
