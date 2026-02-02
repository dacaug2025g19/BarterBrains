import React, { useEffect, useState } from "react";
import axios from "axios";

const ConfirmBadge = () => {
  const uid = Number(localStorage.getItem("uid"));
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8082/confirm/pending/${uid}`)
      .then(res => setShow(res.data.length > 0))
      .catch(() => setShow(false));
  }, [uid]);

  return show ? <span className="confirm-dot" /> : null;
};

export default ConfirmBadge;
