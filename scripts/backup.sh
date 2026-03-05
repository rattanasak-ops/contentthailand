#!/bin/bash
# ContentThailand — Database Backup Script (TOR 4.7)
# Usage: ./scripts/backup.sh
# Recommended: cron job at 06:00 daily

set -euo pipefail

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/contentthailand"
DB_NAME="contentthailand"
DB_USER="ct_user"
CONTAINER_NAME="contentthailand-postgres-1"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting database backup..."

# Dump database from Docker container
docker exec "$CONTAINER_NAME" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/db_${TIMESTAMP}.sql.gz"

echo "[$(date)] Database backup saved: db_${TIMESTAMP}.sql.gz"

# Keep only last 30 days of backups
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +30 -delete

echo "[$(date)] Cleanup complete. Old backups removed."
echo "[$(date)] Backup finished successfully."
