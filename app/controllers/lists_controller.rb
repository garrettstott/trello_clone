class ListsController < ApplicationController
  def index
    @lists = Board.find(params[:board_id]).lists
    @id = params[:board_id]
  end

  def create
    list = Board.find(params[:board_id]).lists.new(list_params)
    if list.save
      render json: list
    else
      render json: { errors: list.errors.full_messages }
    end
  end

  def update
    list = List.find(params[:id]);
    if list.update(list_params)
      render json: list
    else
      render json: { errors: list.errors.full_messages }
    end
  end

  def destroy
    if List.find(params[:id]).destroy
      render json: { id: params[:id].to_i }
    else
      render json: { errors: "List could not be deleted try again" }
    end
  end

  private

    def list_params
      params.require(:list).permit(:name)
    end
end