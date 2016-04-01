class CardsController < ApplicationController
  before_action :list

  def index
    render json: list.cards
  end

  def create
    card = list.cards.new(card_params)
    if card.save
      render json: card
    else
      render json: { errors: card.errors.full_messages }
    end
  end

  private
    def list
      List.find(params[:list_id])
    end

    def card_params
      params.require(:card).permit(:name, :description)
    end
end