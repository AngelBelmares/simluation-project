import pandas as pd
import numpy as np
import scipy.stats as stats

total_E1 = 13843
total_E2 = 3711
total_S1 = 12382
total_S2 = 2400

total_autos_entrada = total_E1 + total_E2 + total_S1 + total_S2

p_E1 = total_E1 / total_autos_entrada
p_E2 = total_E2 / total_autos_entrada
p_S1 = total_S1 / total_autos_entrada
p_S2 = total_S2 / total_autos_entrada

# Los valores esperados
esperados = [total_autos_entrada * p_E1, total_autos_entrada * p_E2, total_autos_entrada * p_S1, total_autos_entrada * p_S2]

# Las observaciones
observados = [total_E1, total_E2, total_S1, total_S2]

# Realizamos la prueba de Chi-cuadrado
chi2, p_valor = stats.chisquare(f_obs=observados, f_exp=esperados)

df = pd.DataFrame({
    'Chi-cuadrado': [chi2],
    'P-valor': [p_valor]
})

# Guardamos el DataFrame en un archivo CSV
df.to_csv('lane.csv', index=False)

print(f"Chi-cuadrado: {chi2}")
print(f"P-valor: {p_valor}")