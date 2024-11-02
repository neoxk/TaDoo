-- Grant permissions
grant select on performance_schema.* to 'mysql.session'@localhost;
grant trigger on sys.* to 'mysql.sys'@localhost;
grant audit_abort_exempt, firewall_exempt, select, system_user on *.* to 'mysql.infoschema'@localhost;
grant audit_abort_exempt, authentication_policy_admin, backup_admin, clone_admin, connection_admin, firewall_exempt, persist_ro_variables_admin, session_variables_admin, shutdown, super, system_user, system_variables_admin on *.* to 'mysql.session'@localhost;
grant audit_abort_exempt, firewall_exempt, system_user on *.* to 'mysql.sys'@localhost;
grant allow_nonexistent_definer, alter, alter routine, application_password_admin, audit_abort_exempt, audit_admin, authentication_policy_admin, backup_admin, binlog_admin, binlog_encryption_admin, clone_admin, connection_admin, create, create role, create routine, create tablespace, create temporary tables, create user, create view, delete, drop, drop role, encryption_key_admin, event, execute, file, firewall_exempt, flush_optimizer_costs, flush_privileges, flush_status, flush_tables, flush_user_resources, group_replication_admin, group_replication_stream, index, innodb_redo_log_archive, innodb_redo_log_enable, insert, lock tables, optimize_local_table, passwordless_user_admin, persist_ro_variables_admin, process, references, reload, replication client, replication slave, replication_applier, replication_slave_admin, resource_group_admin, resource_group_user, role_admin, select, sensitive_variables_observer, service_connection_admin, session_variables_admin, set_any_definer, show databases, show view, show_routine, shutdown, super, system_user, system_variables_admin, table_encryption_admin, telemetry_log_admin, transaction_gtid_tag, trigger, update, xa_recover_admin, grant option on *.* to root;
grant allow_nonexistent_definer, alter, alter routine, application_password_admin, audit_abort_exempt, audit_admin, authentication_policy_admin, backup_admin, binlog_admin, binlog_encryption_admin, clone_admin, connection_admin, create, create role, create routine, create tablespace, create temporary tables, create user, create view, delete, drop, drop role, encryption_key_admin, event, execute, file, firewall_exempt, flush_optimizer_costs, flush_privileges, flush_status, flush_tables, flush_user_resources, group_replication_admin, group_replication_stream, index, innodb_redo_log_archive, innodb_redo_log_enable, insert, lock tables, optimize_local_table, passwordless_user_admin, persist_ro_variables_admin, process, references, reload, replication client, replication slave, replication_applier, replication_slave_admin, resource_group_admin, resource_group_user, role_admin, select, sensitive_variables_observer, service_connection_admin, session_variables_admin, set_any_definer, show databases, show view, show_routine, shutdown, super, system_user, system_variables_admin, table_encryption_admin, telemetry_log_admin, transaction_gtid_tag, trigger, update, xa_recover_admin, grant option on *.* to root@localhost;

-- Database and table creation
create database if not exists tadoo;
use tadoo;

-- Drop and create tables
DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
    name   varchar(20) null,
    tag_id int auto_increment primary key,
    color  varchar(10) null
);

DROP TABLE IF EXISTS task_list;
CREATE TABLE task_list (
    task_list_id int auto_increment primary key,
    name         varchar(40) not null
);

DROP TABLE IF EXISTS task;
CREATE TABLE task (
    task_id      int auto_increment primary key,
    name         varchar(30) not null,
    description  text null,
    task_list_id int not null,
    constraint task_list_FK
        foreign key (task_list_id) references task_list (task_list_id)
);

DROP TABLE IF EXISTS task_tag;
CREATE TABLE task_tag (
    task_tag_id int auto_increment primary key,
    task_id     int not null,
    tag_id      int not null,
    constraint task_tag_FK
        foreign key (task_id) references task (task_id),
    constraint task_tag_FK1
        foreign key (tag_id) references tag (tag_id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    user_id       int auto_increment primary key,
    full_name     varchar(25) not null,
    username      varchar(20) not null,
    email         varchar(40) not null,
    password_hash char(60) not null
);

DROP TABLE IF EXISTS board;
CREATE TABLE board (
    name     varchar(50) not null,
    board_id int auto_increment primary key,
    user_id  int not null,
    constraint user_id
        foreign key (user_id) references user (user_id)
);

DROP TABLE IF EXISTS board_task_list;
CREATE TABLE board_task_list (
    board_task_list_id int auto_increment primary key,
    task_list_id       int not null,
    board_id           int not null,
    constraint board_FK
        foreign key (board_id) references board (board_id),
    constraint board_task_list_FK
        foreign key (task_list_id) references task_list (task_list_id)
);

