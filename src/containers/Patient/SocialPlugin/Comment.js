import { useEffect } from "react";

const Comment = ({ datahref }) => {
  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    // let { language } = this.props;
    // let locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      //   js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);
  return (
    <>
      <div
        class="fb-comments"
        data-href={datahref}
        data-width=""
        data-numposts="5"
      ></div>
    </>
  );
};

export default Comment;
