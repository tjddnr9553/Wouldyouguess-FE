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
    const response = await axios.post(
      `${API_SERVER_URL}/api/findDiff/upload`,
      uploadForm
    );

    return response.data;
  } catch (error) {
    console.error("이미지 처리 중 오류 발생:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 합니다.
  }
};

export const findDiff_og = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/og/${findDiffGameId}/423`
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}

export const findDiff_inpaint = async (inpaintForm) => {
  try {
    const response = await axios.post(
      `${API_SERVER_URL}/api/findDiff/inpaint`,
      inpaintForm
    );

    return response.data;
  } catch (error) {
    console.error("백그라운드 작업 중 오류 발생:", error);
  }
};

export const findDiff_gen = async (findDiffGameId, userId) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${API_SERVER_URL}/api/findDiff/gen/${findDiffGameId}/1234`
        });

        return response.data;
    } catch (error) {
        console.error("Error starting Find Diff game:", error);
    }
}
