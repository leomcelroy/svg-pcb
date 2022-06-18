// https://upload.wikimedia.org/wikipedia/commons/2/2c/2D_affine_transformation_matrix.svg
export function transform(matrix, turtle) {
	// if (Array.isArray(matrix)) // cont
	// else // make matrix from obj { translate, scale, flipvert, fliphorz, skew, origin }
	turtle.path = turtle.pointMap(p => ({
		x: matrix[0][0]*p.x + matrix[0][1]*p.y + matrix[0][2],
		y: matrix[1][0]*p.x + matrix[1][1]*p.y + matrix[1][2],
	}))

	return turtle;
}