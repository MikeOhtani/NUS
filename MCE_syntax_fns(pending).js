// Calculator language 
// * Adding booleans, conditionals, and sequences 
// * Adding blocks and declarations

//
// evaluation
//

function evaluate(comp, env) { 
    return is_literal(comp)
           ? literal_value(comp)
           : is_operator_combination(comp)
           ? apply(operator_combination_operator_symbol(comp),
               list_of_values( 
                 list(operator_combination_first_operand(comp),
                      operator_combination_second_operand(comp)),
                 env))
           : is_conditional(comp)
           ? eval_conditional(comp, env)
           : is_sequence(comp)
           ? eval_sequence(sequence_statements(comp), env)
           : is_name(comp)
           ? lookup_symbol_value(symbol_of_name(comp), env)
           : is_block(comp)
           ? eval_block(comp, env)
           : is_declaration(comp)
           ? eval_declaration(comp, env)
           : is_array_expression(expr)
           ? eval_array_expression(expr)
           : error(comp, "Unknown component:");
}

function list_of_values(exprs, env) {
    return map( comp => evaluate(comp, env), exprs); 
}

function apply(operator, operands) {
    const first_op = head(operands);
    const second_op = head(tail(operands));
    return operator === "+"
           ? first_op + second_op
           : operator === "-"
           ? first_op - second_op 
           : operator === "*" 
           ? first_op * second_op 
           : operator === "/" 
           ? first_op / second_op
           : error(operator, "Unknown operator");
}

function eval_conditional(comp, env) {
   return is_truthy(evaluate(conditional_predicate(comp), env))
          ? evaluate(conditional_consequent(comp), env)
          : evaluate(conditional_alternative(comp), env);
}

function eval_array_expression(expr) {
    // your solution goes here
    const elements = array_elements(expr);
    const output = [];
    if (!is_null(elements)) { 
        for (let i = 0; i < length(elements); i = i + 1) {
            const curr = list_ref(elements, i);
            output[i] = evaluate(curr);
        }
    }
    return output;
}

function eval_sequence(stmts, env) { 
    if (is_empty_sequence(stmts)) {
        return undefined;
    } else if (is_last_statement(stmts)) {
        return evaluate(first_statement(stmts), env);
    } else {
        const ignore = evaluate(first_statement(stmts), env);
        return eval_sequence( rest_statements(stmts), env); 
    } 
}

function scan_out_declarations(component) {
    return is_sequence(component)
           ? accumulate(append,
                        null,
                        map(scan_out_declarations,
                            sequence_statements(component)))
           : is_declaration(component)
           ? list(declaration_symbol(component))
           : null;
}

function eval_block(component, env) {
    const body = block_body(component);
    const locals = scan_out_declarations(body);
    const unassigneds = list_of_unassigned(locals);
    return evaluate(body, extend_environment(locals,
                                             unassigneds, 
                                             env));
}

function list_of_unassigned(symbols) {
    return map(symbol => "*unassigned*", symbols);
}

function eval_declaration(component, env) {
    assign_symbol_value(
        declaration_symbol(component), 
        evaluate(declaration_value_expression(component), env),
        env);
  return undefined;
}

//
// syntax functions
//

// Array

function is_array_expression(expr) {
    return is_tagged_list(expr, "array_expression");
}

function array_elements(expr) {
    return head(tail(expr));
}

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// operator combinations

function is_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}
function operator_combination_operator_symbol(component) {
    return list_ref(component, 1);
}
function operator_combination_first_operand(component) {
    return list_ref(component, 2);
}
function operator_combination_second_operand(component) {
    return list_ref(component, 3);
}

// conditionals

function is_conditional(component) {
    return is_tagged_list(component, "conditional_expression") ||
           is_tagged_list(component, "conditional_statement");
}
function conditional_predicate(component) {
   return list_ref(component, 1);
}
function conditional_consequent(component) {
   return list_ref(component, 2);
}
function conditional_alternative(component) {
   return list_ref(component, 3);
}

// sequences

function is_sequence(stmt) {
   return is_tagged_list(stmt, "sequence");
}
function sequence_statements(stmt) {   
   return head(tail(stmt));
}
function first_statement(stmts) {
   return head(stmts);
}
function rest_statements(stmts) {
   return tail(stmts);
}
function is_empty_sequence(stmts) {
   return is_null(stmts);
}
function is_last_statement(stmts) {
   return is_null(tail(stmts));
}

// names

function is_name(component) {
    return is_tagged_list(component, "name");
}

function symbol_of_name(component) {
    return head(tail(component));
}

// blocks

function is_block(component) {
    return is_tagged_list(component, "block");
}
function block_body(component) {
    return head(tail(component));
}
function make_block(statement) {
    return list("block", statement);
}

// declarations

function is_declaration(component) {
    return is_tagged_list(component, "constant_declaration");
}

function declaration_symbol(component) {
    return symbol_of_name(head(tail(component)));
}
function declaration_value_expression(component) {
    return head(tail(tail(component)));
}

//
// support functions
//

// conditionals

function is_truthy(x) {
    return is_boolean(x) 
           ? x
           : error(x, "boolean expected, received");
}

// environments

function enclosing_environment(env) { return tail(env); }

function first_frame(env) { return head(env); }

const the_empty_environment = null;

function make_frame(symbols, values) { return pair(symbols, values); }

function frame_symbols(frame) { return head(frame); }

function frame_values(frame) { return tail(frame); }

function extend_environment(symbols, vals, base_env) {
    return length(symbols) === length(vals)
           ? pair(make_frame(symbols, vals), base_env)
           : length(symbols) < length(vals)
           ? error("too many arguments supplied: " + 
                   stringify(symbols) + ", " + 
                   stringify(vals))
           : error("too few arguments supplied: " + 
                   stringify(symbols) + ", " + 
                   stringify(vals));
}

function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? head(vals)
                   : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                   ? set_head(vals, val)
                   : scan(tail(symbols), tail(vals));
        } 
        if (env === the_empty_environment) {
            error(symbol, "unbound name -- assignment");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}

// 
// running the evaluator
// 

function parse_and_evaluate(program) {
    return evaluate(parse("{ " + program + " }"), 
                    the_empty_environment);
}

// testing

parse_and_evaluate("1 + 2;");

parse_and_evaluate("1; 2; 3;");

parse_and_evaluate("true ? 2 : 3;");

parse_and_evaluate("8 + 34; true ? 1 + 2 : 17;");

parse_and_evaluate(`
const y = 4; 
{
    const x = y + 7; 
    x * 2;
}
    `);

