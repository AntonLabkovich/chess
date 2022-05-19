import { Figure } from './figures/Figure';
import { Knight } from './figures/Knight';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { King } from './figures/King';
import { Pawn } from './figures/Pawn';
import { Colors } from './Colors';
import { Cell } from './Cell'
import { Bishop } from './figures/Bishop';

export class Board{
    cells: Cell[][] = []
    lostBlackfigures:Figure[] = []
    lostWhitefigures:Figure[] = []

    public initCells(){
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for(let j = 0; j < 8; j++){
                if((i+j) % 2 !== 0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // black cell
                }else{
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // white cell
                }
            } 
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number){
        return this.cells[y][x];
    }

    public hightLightCells(selectedCell: Cell | null){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i]
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells;
        newBoard.lostBlackfigures = this.lostBlackfigures;
        newBoard.lostWhitefigures = this.lostWhitefigures;
        return newBoard
    }

    private addPawn () {
        for (let i = 0; i < 8; i++){
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKing () {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addQueen () {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addRook () {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }

    private addKnights () {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))

        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7)) 
    }

    private addBishop () {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))

        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
        
    }

    public addFigures(){
        this.addBishop();
        this.addRook();
        this.addKing();
        this.addKnights();
        this.addPawn();
        this.addQueen();
    }
}