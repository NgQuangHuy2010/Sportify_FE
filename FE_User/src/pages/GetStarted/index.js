import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./GetStarted.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
const cx = classNames.bind(styles);

function GetStarted() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <>
      <div className={cx("get-started","mt-5 pt-5")}>
        <div className="row ">
          {/* Cột chứa nội dung văn bản */}
          <div className="col-6 d-flex align-items-center justify-content-center">
            <div className={cx("overlay")}>
              <h1 className={cx("text-find_players_venues","py-4")}>{t('get-started.find_players_venues')}</h1>
              <p className={cx("text-explore_venues","pb-3")}>{t('get-started.explore_venues')}</p>
              <button className={cx("btn-navigate")} onClick={handleNavigate}>
              {t('get-started.button')}
              </button>
            </div>
          </div>

          <div className={cx("customCol", "col-6")}>
            <div className={cx("customRow")}>
              <div className={cx("customLeftCol")}>
                <div className={cx("customGCol")}>
                  <img
                    src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_left.png"
                    alt="hero3"
                    className={cx("customImg")}
                  />
                </div>
              </div>

              {/* Hình ảnh bên phải */}
              <div className={cx("customRightCol")}>
                <div className={cx("customGCol")}>
                  <img
                    src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_top.png"
                    alt="hero3"
                    className={cx("customImg")}
                  />
                </div>
                <div className={cx("customGCol")}>
                  <img
                    src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_bottom.png"
                    alt="hero3"
                    className={cx("customImg")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
