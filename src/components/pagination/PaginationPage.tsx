import React from "react";
import MUIPagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "@/Redux/filterBase";
import { RootState } from "@/Redux/store";

const PaginationPage = ({
  total,
}: {
  total: number;
}) => {
  const dispatch = useDispatch();
  const values = useSelector((state: RootState) => state.filter);
  if (!values.itemsPerPage) return null;
  
  return (
    <div
      className={` ${
        total === 0 || total <= values.itemsPerPage   ? "hidden " : "block"
      } w-full flex justify-center pb-20`}
    >
      <MUIPagination
        sx={{
          "& .MuiPaginationItem-ellipsis": {
            backgroundColor: "transparent !important", // Убираем фон у точек
            border: "none !important", // Если нужно убрать границу
            color: " #EBEFC1 !important", // Оставляем цвет как у обычного текста
            fontSize: "35px !important", // Размер шрифта точек
            minWidth: "43px !important", // Минимальная ширина точки
            minHeight: "55px !important", //// Минимальная высота точки
            width: "auto !important", // Задаем ширину точек
            height: "30px !important", // Задаем высоту точек
            padding: "0px !important", // Задаем высоту точек
          },

          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#EBEFB1", // Фон активной кнопки
            scale: "1.3",
          },
          "& .MuiPaginationItem-root": {
            color: "black", // Цвет текста
            backgroundColor: " #EBEFCE",
            padding: "10px",
            border: "none",
            minWidth: "4px",
            width: {
              xs: "30px", // Для мобильных экранов (xs)
              md: "35px", // Для средних экранов (md)
            },
            height: {
              xs: "30px", // Для мобильных экранов (xs)
              md: "35px", // Для средних экранов (md)
            },
            margin: {
              xs: "4px", // Для мобильных экранов (xs)
              md: "5px", // Для средних экранов (md)
            },
            fontSize: "13px", // Увеличиваем шрифт
          },
          "& .MuiPaginationItem-previousNext": {
            display: {
              xs: "none", // скрыть на xs
              sm: "flex", // показать на sm и выше
            },
            backgroundColor: "#EBEFCE", // Меняем цвет фона
            color: "black",
            fontSize: "2000rem !important", // Увеличиваем размер текста
            padding: "8px 16px !important", // Увеличиваем внутренние отступы для кнопок
            borderRadius: "8px", // Можно добавить скругление
            marginLeft: "10px",
            marginRight: "10px",
            minHeight: "35px",
            "& .MuiPaginationItem-icon": {
              fontSize: "30px",
            },
            "&:hover": {
              backgroundColor: "#EBEFB1", // Убираем цвет фона при наведении
              boxShadow: "none", // Убираем возможные тени
            },
          },
        }}
        count={Math.ceil(total / values.itemsPerPage)}
        page={values.page}
        style={{ color: "#EBEFCE" }}
        onChange={(_, i) => dispatch(changeFilter({ page: i }))}
        variant="outlined"
      />
    </div>
  );
};

export default PaginationPage;
