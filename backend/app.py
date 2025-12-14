# backend/app.py
import os
from flask import Flask
from flask_cors import CORS
from database.db import db

def create_app():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    app = Flask(
        __name__,
        static_folder=os.path.join(BASE_DIR, "static"),
        static_url_path="/static"
    )

    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
    )

    app.config.from_object("config.Config")
    db.init_app(app)

    from routes.analyze import analyze_bp
    from routes.personality import personality_bp
    from routes.career import career_bp
    from routes.auth import auth_bp
    from routes.profile import profile_bp
    from routes.therapy_api import therapy_bp
    from routes.therapy import therapy_data_bp

    app.register_blueprint(analyze_bp)
    app.register_blueprint(personality_bp)
    app.register_blueprint(career_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(therapy_bp)
    app.register_blueprint(therapy_data_bp)

    return app


if __name__ == "__main__":
    print("✅ Backend running at http://127.0.0.1:5000")
    app = create_app()
    app.run(debug=True)
