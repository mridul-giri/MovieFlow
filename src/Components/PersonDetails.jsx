import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPerson, clearPersonInfo } from "../store/actions/PersonActions";
import { Loader } from "./Loader";

export function PersonDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPerson(id));
    return () => {
      dispatch(clearPersonInfo());
    };
  }, [dispatch, id]);

  if (!info) {
    return <Loader />;
  }

  const socialMediaLinks = info.external_ids || {};

  return (
    <div className="w-full relative p-6 bg-gray-900 text-white h-fit">
      {/* Header: Back Button */}
      <nav className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl font-semibold flex items-center hover:text-gray-400 transition"
        >
          <i className="ri-arrow-left-line pt-1"></i>
          <span className="ml-2">Back</span>
        </button>
      </nav>

      <div className="flex flex-row items-start mt-10">
        <div className="w-[50%] flex flex-col items-start">
          <img
            className="object-cover w-[90%] rounded-lg shadow-lg mb-4"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt={`${info.detail.name} Profile`}
          />

          <div className="flex mb-6 gap-3">
            {socialMediaLinks.facebook_id && (
              <a
                href={`https://www.facebook.com/${socialMediaLinks.facebook_id}`}
                className="text-gray-400 hover:text-white transition"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-facebook-fill text-2xl"></i>
              </a>
            )}

            {socialMediaLinks.twitter_id && (
              <a
                href={`https://twitter.com/${socialMediaLinks.twitter_id}`}
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-twitter-fill text-2xl"></i>
              </a>
            )}

            {socialMediaLinks.instagram_id && (
              <a
                href={`https://www.instagram.com/${socialMediaLinks.instagram_id}`}
                className="text-gray-400 hover:text-white transition"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-instagram-fill text-2xl"></i>
              </a>
            )}

            {info.detail.homepage && (
              <a
                href={info.detail.homepage}
                className="text-gray-400 hover:text-white transition"
                aria-label="Website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-link text-2xl"></i>
              </a>
            )}
          </div>
        </div>

        {/* Main Section: Biography */}
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-4">{info.detail.name}</h1>

          {/* Biography Section with Scroll */}
          <div className="max-h-70 overflow-y-auto mb-6">
            <p className="text-base text-gray-300 leading-relaxed">
              {info.detail.biography || "No Biography Available!"}
            </p>
          </div>

          {/* Person Info Section */}
          <div className="flex mt-10">
            <div className="bg-gray-800 py-3 px-5 rounded-lg w-full">
              <h2 className="text-2xl font-medium mb-4">Person Info</h2>
              <p className="text-gray-400 mb-2">
                <strong>Known For: </strong>{" "}
                {info.detail.known_for_department || "N/A"}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Gender: </strong>{" "}
                {info.detail.gender === 1 ? "Female" : "Male"}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Birthday: </strong> {info.detail.birthday || "N/A"}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Place of Birth: </strong>{" "}
                {info.detail.place_of_birth || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
