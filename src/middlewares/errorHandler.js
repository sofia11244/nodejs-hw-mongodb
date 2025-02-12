// src/middlewares/errorHandler.js
// İlgili durum kodları ile HTTP hatalarını işlemek için HttpError sınıfını içe aktarıyoruz
import { HttpError } from 'http-errors';


export const errorHandler = (err, req, res, next) => {
// createHttpError'dan bir hata alıp almadığımızı kontrol ediyoruz
if (err instanceof HttpError) {
  res.status(err.status).json({
    status: err.status,
    message: err.name,
    data: err,
  });
  return;
}

res.status(500).json({
  status: 500,
  message: 'Internal Server Error',
  data: err.message,
});
};