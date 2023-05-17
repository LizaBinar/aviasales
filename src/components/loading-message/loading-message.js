import { message } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const key = "updatable";

const loading = {
  key,
  type: "loading",
  content: "Ищу билеты...",
  duration: 35,
};

const success = {
  key,
  type: "success",
  duration: 2,
};

const error = {
  key,
  type: "error",
  content: "Все билеты улетели =(",
  duration: 2,
};

const makeSuccess = (count) => {
  const obj = { ...success };
  obj.content = `Нашел ${count} билетов`;
  return obj;
};

const getObj = (searchStop, success) => {
  switch (searchStop) {
    case true:
      return success;
    case false:
      return loading;
    case "error":
      return error;
  }
};

const LoadingMessage = ({ searchStop, count }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = makeSuccess(count);
  const obj = getObj(searchStop, success);

  const openMessage = () => {
    messageApi.open(obj);
  };

  useEffect(() => {
    openMessage();
  }, [searchStop]);

  return <>{contextHolder}</>;
};

LoadingMessage.propTypes = {
  searchStop: PropTypes.bool,
  count: PropTypes.number,
};

export default LoadingMessage;
