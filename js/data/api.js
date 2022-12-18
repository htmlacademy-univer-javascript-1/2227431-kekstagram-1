const GET_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';
const getPhotos = async (onFail) => {
  let response;
  try {
    response = await fetch(GET_SERVER_ADDRESS);
    if (!response.ok) {
      throw new Error('Not OK response');
    }
  } catch (err) {
    onFail();
  }

  return await response.json();
};

const isPictureSent = async (onFail, body) => {
  let response;
  try {
    response = await fetch(
      SEND_SERVER_ADDRESS,
      {method: 'POST', body},
    );
    if (!response.ok) {
      throw new Error('Not OK response');
    }
  } catch (err) {
    onFail();
  }
  return response.ok;
};

export {getPhotos, isPictureSent};
