/**
 * @properties={type:8,typeid:36,uuid:"5EEAA3FB-AF14-4D37-9C70-0C5616954C9E"}
 */
function calc_porc_prec_aumento()
{
	return ((prd_prec_act / prd_prec_ant) - 1) * 100;
}

/**
 * @properties={type:8,typeid:36,uuid:"1833E104-DD3A-4F68-9F50-099EC28A5A77"}
 */
function calc_porc_costo_aumento()
{
	return ((prd_costo_act / prd_costo_ant) -1) * 100;
}
