const getPhotos = async (onFail) => {
  let response;
  try {
    response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
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
      'https://26.javascript.pages.academy/kekstagram',
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
