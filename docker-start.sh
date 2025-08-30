#!/bin/bash

# Script para gerenciar o container do HubWeb3

case "$1" in
  "build")
    echo "🔨 Fazendo build da imagem Docker..."
    docker compose build --no-cache
    ;;
  "up")
    echo "🚀 Subindo o serviço..."
    docker compose up -d
    ;;
  "start")
    echo "🔨 Fazendo build e subindo o serviço..."
    docker compose up -d --build
    ;;
  "stop")
    echo "⏹️  Parando o serviço..."
    docker compose down
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker compose logs -f hubweb3-frontend
    ;;
  "status")
    echo "📊 Status dos containers..."
    docker compose ps
    ;;
  "restart")
    echo "🔄 Reiniciando o serviço..."
    docker compose restart
    ;;
  "clean")
    echo "🧹 Limpando containers e imagens..."
    docker compose down
    docker rmi $(docker images -q "hubweb3*") 2>/dev/null || true
    docker system prune -f
    ;;
  "dev")
    echo "🔧 Subindo ambiente de desenvolvimento..."
    docker compose -f docker-compose.dev.yml up -d --build
    ;;
  *)
    echo "Uso: $0 {build|up|start|stop|logs|status|restart|clean|dev}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  build    - Fazer build da imagem Docker"
    echo "  up       - Subir o serviço (sem rebuild)"
    echo "  start    - Build + subir o serviço"
    echo "  stop     - Parar o serviço"
    echo "  logs     - Mostrar logs do container"
    echo "  status   - Status dos containers"
    echo "  restart  - Reiniciar o serviço"
    echo "  clean    - Limpar containers e imagens"
    echo "  dev      - Subir ambiente de desenvolvimento"
    exit 1
    ;;
esac
