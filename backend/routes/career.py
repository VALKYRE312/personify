from flask import Blueprint, jsonify
from personality_engine.career_data import CAREER_MAP

career_bp = Blueprint("career", __name__, url_prefix="/api/career")

@career_bp.get("/<ptype>")
def get_career(ptype):
    base = ptype.split("-")[0].upper()
    return jsonify(CAREER_MAP.get(base, {}))
