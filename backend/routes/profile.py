from flask import send_from_directory, Blueprint, request, jsonify
import os
import time
from werkzeug.utils import secure_filename

profile_bp = Blueprint("profile", __name__, url_prefix="/api/profile")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "..", "static", "profile_pics")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@profile_bp.route("/upload-photo", methods=["POST"])
def upload_photo():
    if "photo" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["photo"]

    if not file or not file.filename:
        return jsonify({"error": "Invalid file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    
    filename = f"{int(time.time())}_{secure_filename(file.filename)}"
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(save_path)

        # ✅ IMPORTANT: return HTTP URL, not filesystem path
    image_url = f"/api/profile/profile-pics/{filename}"

    # TODO: save image_url in DB against user_id

    return jsonify({"imageUrl": image_url}), 200

@profile_bp.route("/profile-pics/<path:filename>")
def get_profile_pic(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
