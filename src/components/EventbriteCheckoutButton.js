// components/EventbriteCheckoutButton.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function EventbriteCheckoutButton({ eventId, text = "Register" }) {
  useEffect(() => {
    // only run in the browser
    if (typeof window === "undefined") return;

    const id = "eb-widgets";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const openCheckout = () => {
    if (typeof window === "undefined" || !window.EBWidgets) return;
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      modal: true,
      onOrderComplete: () => {
        // optional: toast/redirect or POST to your API
      },
    });
  };

  return (
    <button onClick={openCheckout} className="btn btn-primary">
      {text}
    </button>
  );
}

EventbriteCheckoutButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  text: PropTypes.string,
};
