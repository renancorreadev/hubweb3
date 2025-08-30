#!/bin/bash

# Script para converter diagramas Mermaid para PNG usando ferramenta online

echo "🔄 Convertendo diagramas Mermaid para PNG..."

# Função para converter usando curl e API online
convert_mermaid() {
    local input_file=$1
    local output_file=$2

    echo "📄 Convertendo: $input_file -> $output_file"

    # Ler o conteúdo do arquivo mermaid
    local mermaid_content=$(cat "$input_file")

    # Usar API online para conversão (exemplo com mermaid.ink)
    local encoded_content=$(echo "$mermaid_content" | base64 -w 0)

    # Fazer download da imagem PNG
    curl -s "https://mermaid.ink/img/$encoded_content" -o "$output_file"

    if [ -f "$output_file" ]; then
        echo "✅ Sucesso: $output_file criado"
    else
        echo "❌ Erro: Falha ao criar $output_file"
    fi
}

# Converter diagramas
convert_mermaid "public/images/projects/besuscan/architecture/data-flow.mmd" "public/images/projects/besuscan/architecture/data-flow.png"

convert_mermaid "public/images/projects/besuscan/architecture/uml-architecture.mmd" "public/images/projects/besuscan/architecture/uml-architecture.png"

convert_mermaid "public/images/projects/besuscan/architecture/uml-classes.mmd" "public/images/projects/besuscan/architecture/uml-classes.png"

if [ -f "public/images/projects/besuscan/architecture/microservices-architecture.mmd" ]; then
    convert_mermaid "public/images/projects/besuscan/architecture/microservices-architecture.mmd" "public/images/projects/besuscan/architecture/microservices-architecture.png"
fi

echo "🎉 Conversão concluída!"
echo "📁 Arquivos PNG criados em: public/images/projects/besuscan/architecture/"
