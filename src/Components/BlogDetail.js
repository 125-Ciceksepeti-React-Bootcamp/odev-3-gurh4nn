import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "Style/detail.scss";
import { FiEdit, FiDelete, FiSave } from "react-icons/fi";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlogDetail({ blogs }) {
  const [filteredData, setFilteredData] = useState({});
  const [editable, setEditable] = useState(false);
  const { slug } = useParams();
  const history = useHistory();
  const title = useRef(null);
  const text = useRef(null);
  useEffect(
    () => [setFilteredData(blogs.filter((item) => item.slug === slug))],
    []
  );

  const deletItem = () => {
    axios
      .delete(
        `https://6157d5c65167ba00174bb987.mockapi.io/data/${filteredData?.[0]?.id}`
      )
      .then((response) => {
        notify(
          "Silme İşlemi Başarıyla Gerçekleşti, Anasayfaya Yönlendiriliyorsunuz!"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      });
  };

  const editItem = () => {
    setEditable(!editable);
    if (editable) {
      notify("Kayıt işlemi başarılı ama kaydetmek istemedim :/");
      title.current.contentEditable = "false";
      text.current.contentEditable = "false";
    } else {
      notify(
        "Başlık ve metnin üzerinde tıklayarak editlemeye başlayabilirsin!"
      );
      title.current.contentEditable = "true";
      text.current.contentEditable = "true";
    }
  };

  const notify = (message) =>
    toast.info(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <div className="detail">
      <img
        className="card--thumb"
        loading="lazy"
        src={filteredData?.[0]?.img}
        alt={filteredData?.[0]?.title}
      />
      <div className="card__data">
        <h1
          to={filteredData?.[0]?.slug}
          ref={title}
          className="card__data--title"
        >
          {filteredData?.[0]?.title}
        </h1>
        <div className="card__data__info">
          <div>
            <span className="card__data__info--author">
              {filteredData?.[0]?.author}
            </span>
            <span className="card__data__info--date">
              {filteredData?.[0]?.date}
            </span>
          </div>
          <div>
            {editable ? (
              <FiSave onClick={editItem} />
            ) : (
              <FiEdit onClick={editItem} />
            )}
            <FiDelete onClick={deletItem} />
          </div>
        </div>
        <p ref={text} className="card__data--desc">
          {filteredData?.[0]?.description}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BlogDetail;
