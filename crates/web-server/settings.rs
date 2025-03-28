use crate::errors::CustomError;
use axum::{
    response::{Html, IntoResponse},
    Extension,
};
use web_pages::settings;

pub async fn loader(Extension(pool): Extension<db::Pool>) -> Result<Html<String>, CustomError> {
    let client = pool.get().await?;

    let users = db::queries::users::get_users().bind(&client).all().await?;

    let html = settings::index(users);

    Ok(Html(html))
}