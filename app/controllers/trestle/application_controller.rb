class Trestle::ApplicationController < ActionController::Base
  protect_from_forgery
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    flash[:error] = "对不起，您无权访问该页面"
    redirect_to(request.referrer || root_url)
  end

  include Trestle::Controller::Breadcrumbs
  include Trestle::Controller::Callbacks
  include Trestle::Controller::Dialog
  include Trestle::Controller::Helpers
  include Trestle::Controller::Layout
  include Trestle::Controller::Location


end
