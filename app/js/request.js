import avalon from 'avalon2';
import mmRequest from 'mmRequest';

export const listJson = function () {
  return new Promise(function (res, rej) {
    avalon.ajax({
      type: 'GET',
      url: 'https://raw.githubusercontent.com/LYY1123/lyyglob.github.io/master/json/list.json',
      success (resp) {
        res(resp);
      },
      error () {
        rej();
      }
    });
  });
};
