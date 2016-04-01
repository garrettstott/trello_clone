class BoardsController < ApplicationController
  def index
    @boards = Board.all
  end

  def create
    board = Board.new(board_params)
    if board.save
      render json: board
    else
      render json: { errors: board.errors.full_messages }
    end
  end

  def destroy
    if Board.find(params[:id]).destroy
      render json: { id: params[:id].to_i }
    else
      render json: { errors: "Board can't be deleted. Try again." }
    end
  end

  def update
    board = Board.find(params[:id])
    if board.update(board_params)
      render json: board
    else
      render json: { errors: board.errors.full_messages }
    end
  end

  private
    def board_params
      params.require(:board).permit(:name, :description)
    end
end
