export type classroomType = 'inicial' | 'primaria' | 'secundaria' | 'taller';

const FACTORES_SUPERFICIE: Record<classroomType, number> = {
    inicial: 1.60,
    primaria: 1.25,
    secundaria: 1.25,
    taller: 2.25
};

const FACTORES_CUBAJE: Record<classroomType, number> = {
    inicial: 3.5,
    primaria: 3.0,
    secundaria: 3.0,
    taller: 4.0
};

interface CalcularAforoParams {
    squareMeters: number;
    heightInMeters: number;
    classroomType: classroomType;
    deductTeacherSpace?: boolean | number;
}

export const calcularAforoAula = ({
    squareMeters,
    heightInMeters,
    classroomType,
    deductTeacherSpace = true
}: CalcularAforoParams): number => {

    const espacioDescontado = typeof deductTeacherSpace === 'number' ? deductTeacherSpace : (deductTeacherSpace ? 5 : 0)

    const superficieUtil = Math.max(0, squareMeters - espacioDescontado);
    const volumenUtil = superficieUtil * heightInMeters;

    const factorSuperficie = FACTORES_SUPERFICIE[classroomType];
    const factorCubaje = FACTORES_CUBAJE[classroomType];

    const aforoPorSuperficie = Math.floor(superficieUtil / factorSuperficie);
    const aforoPorCubaje = Math.floor(volumenUtil / factorCubaje);

    return Math.min(aforoPorSuperficie, aforoPorCubaje);
};