class Config:
    DEBUG = True
    SECRET_KEY = "super-secret-key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///personality.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
