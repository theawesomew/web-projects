matrix = []
for i in range(1,11):
    matrix.append([])
    for j in range(1,11):
        matrix[i-1].append([i,j])

print(matrix)