use crate::errors::CustomError;
use axum::{http::StatusCode, response::{Html, IntoResponse, Redirect, Response}, Extension};
use axum_extra::extract::Form;
use serde::Deserialize;
use validator::Validate;
use web_pages::root;

pub async fn loader(Extension(pool): Extension<db::Pool>) -> Result<Html<String>, CustomError> {
    let client = pool.get().await?;

    let users = db::queries::users::get_users().bind(&client).all().await?;

    let html = root::index(users);

    Ok(Html(html))
}

// 👇 create new SignUp struct
#[derive(Deserialize, Validate)]
pub struct SignUp {
    #[validate(email)] // 👈 add validate annotation
    email: String,
}

// 👇 handle form submission
pub async fn new_user_action(
    Extension(pool): Extension<db::Pool>,
    Form(form): Form<SignUp>,
) -> Result<Response, CustomError> {

    // 👇 add our error handling
    if form.validate().is_err() {
        return Ok((StatusCode::BAD_REQUEST, "Bad request").into_response());
    }

    let client = pool.get().await?;

    let email = form.email;
    let _ = db::queries::users::create_user()
        .bind(&client, &email.as_str())
        .await?;

    // 303 redirect to users list
    Ok(Redirect::to("/").into_response())
}

pub async fn delete_user_action(
    Extension(pool): Extension<db::Pool>,
    Form(form): Form<SignUp>,
) -> Result<Response, CustomError> {
    let client = pool.get().await?;

    let email = form.email;
    let _ = db::queries::users::delete_user()
        .bind(&client, &email.as_str())
        .await?;

    // 303 redirect to users list
    Ok(Redirect::to("/").into_response())
}
