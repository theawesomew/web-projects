from turtle import *
color('black', 'white')
begin_fill()

def gosper_curve (order: int, size: int, is_A: bool = True) -> None:
    if order == 0:
        forward(size)
        return
    for op in "A-B--B+A++AA+B-" if is_A else "+A-BB--B-A++A+B":
        gosper_op_map[op](order - 1, size)
        
gosper_op_map = {
    "A": lambda o, size: gosper_curve(o, size, True),
    "B": lambda o, size: gosper_curve(o, size, False),
    "-": lambda o, size: right(60),
    "+": lambda o, size: left(60)
}

size = 10
order = 3
gosper_curve(order, size)

end_fill()
done()
