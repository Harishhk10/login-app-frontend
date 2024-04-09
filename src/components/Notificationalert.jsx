import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function Notificationalert(title, content, type) {
  console.log(title, content, type,'checkk');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 56000); // Hide after 56 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: "9999",
      }}
    >
      <Alert
        show={show}
        variant={type}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{title}</Alert.Heading>
        <p>{content}</p>
        <hr />
      </Alert>
    </div>
  );
}

export default Notificationalert;
