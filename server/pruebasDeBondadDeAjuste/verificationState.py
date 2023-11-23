import pandas as pd
import numpy as np
import scipy.stats as stats

aceptados = 31445
rechazados = 891
total = aceptados + rechazados

p_aceptados = 0.972445571
p_rechazados = 0.027554429

# Los valores esperados
esperados = [total * p_rechazados, total * p_aceptados]

# Las observaciones
observados = [rechazados, aceptados]

# Realizamos la prueba de Chi-cuadrado
chi2, p_valor = stats.chisquare(f_obs=observados, f_exp=esperados)

df = pd.DataFrame({
    'Chi-cuadrado': [chi2],
    'P-valor': [p_valor]
})

# Guardamos el DataFrame en un archivo CSV
df.to_csv('verificationType.csv', index=False)

print(f"Chi-cuadrado: {chi2}")
print(f"P-valor: {p_valor}")