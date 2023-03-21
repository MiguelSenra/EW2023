import ply.lex as lex

states = (
    ("ocomment", "exclusive"),
    ("linecomment", "exclusive")
)

tokens = (
    "A_COMMENT",
    "F_COMMENT",
    "AL_COMMENT",
    "FL_COMMENT",
    "TIPO",
    "VARIAVEL",
    "OPERADOR",
    "NUMERO"
)


def t_TIPO(t):
    r"int|bool|float|double|string"
    return t


def t_A_COMMENT(t):
    r"\/\*"
    t.lexer.begin("ocomment")
    return t


def t_ocomment_F_COMMENT(t):
    r"\*\/"
    t.lexer.begin("INITIAL")
    return t


def t_AL_COMMENT(t):
    r"\/\/"
    t.lexer.begin("linecomment")
    return t


def t_linecomment_FL_COMMENT(t):
    r"\n"
    t.lexer.begin("INITIAL")
    return t


def t_NUMERO(t):
    r"-?\d+"
    return t


def t_OPERADOR(t):
    r"[\+\-/\*]"
    return t


def t_VARIAVEL(t):
    r"\w+"
    t.lexer.variables.append(t.value)
    return t


t_ANY_ignore = " \n\t"

t_linecomment_ignore = " \t"


def t_ocomment_linecomment_error(t):
    t.lexer.skip(1)


def t_error(t):
    print(f"CARATERE ilegal {t.value[0]}")
    t.lexer.skip(1)


lexer = lex.lex()

data = """
/* factorial.p
-- 2023-03-20 
-- by jcr
*/
// Programa principal
int i
2+3
3-2
3/2
3*3
// Programa principal
"""
lexer.input(data)
lexer.variables = list()


while token := lexer.token():
    print(token)
